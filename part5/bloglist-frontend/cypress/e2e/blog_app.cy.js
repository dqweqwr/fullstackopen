const BACKEND = Cypress.env("BACKEND")

describe("Blog app", function() {
  const username = "testusername"
  const password = "testpassword"
  const name = "testuser"

  beforeEach(function() {
    const user = { username, name, password }

    cy.request("POST", `${BACKEND}/testing/reset`)
    cy.request("POST", `${BACKEND}/users`, user)

    cy.visit("")
  })

  it("login form is shown", function() {
    cy.contains("User must be logged in to see blog list")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type(username)
      cy.get("#password").type(password)
      cy.get("button[type='submit']").click()
      cy.get(".success")
        .should("contain", `Logged in as ${username}`)
    })

    it("fails with invalid credentials", function() {
      cy.get("#username").type(username)
      cy.get("#password").type("wrongpassword")
      cy.get("button[type='submit']").click()
      cy.get(".error")
        .should("contain" ,"Invalid username or password")
        .and("have.css", "color", "rgb(114, 28, 36)")
    })
  })

  describe.only("When logged in", function() {
    const title = "I want off Mr. Golang's Wild Ride"
    const author = "fasterthanlime"
    const url = "https://fasterthanli.me/articles/i-want-off-mr-golangs-wild-ride"

    beforeEach(function () {
      cy.request("POST", `${BACKEND}/login`, { username, password })
        .then(({ body }) => {
          window.localStorage.setItem("loggedBlogListUser", JSON.stringify(body))
        })
      cy.visit("");
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
  })
})
