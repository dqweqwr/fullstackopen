describe("Note app", function() {
  const name = "testuser"
  const username = "testusername"
  const password = "testpassword"

  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    const user = { name, username, password }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)
    cy.visit("")
  })

  it("front page can be opened", function() {
    cy.contains("Notes")
    cy.contains("Note app 2023")
  })

  it("logs in", function() {
    cy.contains("login").click()
    cy.get("#username").type(username)
    cy.get("#password").type(password)
    cy.get("button[type='submit']").click()

    cy.contains(`${name} logged in`)
  })

  it("login fails with wrong password", function() {
    cy.contains("login").click()
    cy.get("#username").type(username)
    cy.get("#password").type("wrongpassword")
    cy.get("button[type='submit']").click()

    cy.get(".error")
      .should("contain" ,"Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")

    cy.get("html").should("not.contain", `${name} logged in`)
  })

  describe("when logged in", function() {
    beforeEach(function() {
      cy.login({ username, password })
    })

    it("a new note can be created", function() {
      const input = `${Math.floor(Math.random() * 1000000)} asdf`
      cy.get(".toggle").click()
      cy.get("input[placeholder='write note content here']").type(input)
      cy.contains("save").click()
      cy.contains(input)
    })

    describe("and a note exists", function() {
      const input = "hello world asdf"

      beforeEach(function() {
        cy.createNote({
          content: input,
          important: true
        })
      })

      it("it can be made not important", function() {
        cy.contains("make not important")
          .click()

        cy.contains("make important")
      })
    })

    describe("and several notes exist", function() {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false })
        cy.createNote({ content: "second note", important: false })
        cy.createNote({ content: "third note", important: false })
      })

      it("one of those can be made important", function() {
        cy.contains("second note")
          .parent()
          .find("button")
          .as("theButton")

        cy.get("@theButton").click()
        cy.get("@theButton").should("contain", "make not important")
      })
    })
  })
})
