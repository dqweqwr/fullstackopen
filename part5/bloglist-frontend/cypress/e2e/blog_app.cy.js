const BACKEND = Cypress.env("BACKEND")

describe("Blog app", function() {
  const user1 = {
    username: "testusername1",
    password: "testpassword1",
    name: "testuser1"
  }

  const user2 = {
    username: "testusername2",
    password: "testpassword2",
    name: "testuser2"
  }

  beforeEach(function() {
    cy.request("POST", `${BACKEND}/testing/reset`)
    cy.request("POST", `${BACKEND}/users`, user1)
    cy.request("POST", `${BACKEND}/users`, user2)

    cy.visit("")
  })

  it("login form is shown", function() {
    cy.contains("User must be logged in to see blog list")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type(user1.username)
      cy.get("#password").type(user1.password)
      cy.get("button[type='submit']").click()
      cy.get(".success")
        .should("contain", `Logged in as ${user1.username}`)
    })

    it("fails with invalid credentials", function() {
      cy.get("#username").type(user1.username)
      cy.get("#password").type("wrongpassword")
      cy.get("button[type='submit']").click()
      cy.get(".error")
        .should("contain" ,"Invalid username or password")
        .and("have.css", "color", "rgb(114, 28, 36)")
    })
  })

  describe("When logged in", function() {
    const title = "I want off Mr. Golang's Wild Ride"
    const author = "fasterthanlime"
    const url = "https://fasterthanli.me/articles/i-want-off-mr-golangs-wild-ride"

    beforeEach(function() {
      cy.login(user1)
    });

    it("a blog can be created", function() {
      cy.contains("Add new blog")
        .click()

      cy.get("#title").type(title)
      cy.get("#url").type(url)
      cy.get("#author").type(author)
      cy.get("button[type='submit']").click()

      cy.contains(`title: ${title}`)
      cy.contains(`author: ${author}`)
    })

    describe("When a blog listing exists", function() {
      beforeEach(function() {
        cy.createBlog({ title, url, author })
      })

      it("users can like a blog", function() {
        cy.contains(`title: ${title}`)
          .parent()
          .find("button")
          .click()
        cy.contains("likes: 0")
        cy.get("button")
          .contains(/^like$/)
          .click()
        cy.contains("likes: 1")
      })

      it("User can delete blog listings they have created", function() {
        cy.contains(`title: ${title}`)
          .parent()
          .find("button")
          .click()
        cy.get("button")
          .contains("delete")
          .click()
        cy.get(".success")
          .contains("\"I want off Mr. Golang's Wild Ride\" by fasterthanlime deleted")
      })

      it.only("User cannot delete blog listings they didnt create (delete button is hidden)", function() {
        cy.contains("Log out")
          .click()
        cy.login(user2)
        cy.contains(`title: ${title}`)
          .parent()
          .find("button")
          .click()
        cy.contains(`title: ${title}`)
          .parent()
          .should("not.include.text", "delete")
      })
    })
  })
})
