describe("Note app", function() {
  const name = "testuser"
  const username = "testusername"
  const password = "testpassword"

  beforeEach(function() {
    cy.request("POST", "http://localhost:3000/api/testing/reset")
    const user = { name, username, password }
    cy.request("POST", "http://localhost:3000/api/users", user)
    cy.visit("localhost:3000")
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

  describe("when logged in", function() {
    beforeEach(function() {
      cy.contains("login").click()
      cy.get("#username").type(username)
      cy.get("#password").type(password)
      cy.get("button[type='submit']").click()
    })

    it("a new note can be created", function() {
      const input = `${Math.floor(Math.random() * 1000000)} asdf`
      cy.get(".toggle").click()
      cy.get("input[placeholder='write note content here']").type(input)
      cy.contains("save").click()
      cy.contains(input)
    })

    describe("and a note exists", () => {
      const input = "hello world asdf"

      beforeEach(function() {
        cy.get(".toggle").click()
        cy.get("input[placeholder='write note content here']").type(input)
        cy.contains("save").click()
      })

      it("it can be made not important", function() {
        cy.contains(input)
          .contains("make not important")
          .click()

        cy.contains(input)
          .contains("make important")
      })
    })

  })
})
