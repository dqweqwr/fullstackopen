describe("Note app", function() {
  beforeEach(function() {
    cy.visit("localhost:3000")
  })
  it("front page can be opened", function() {
    cy.contains("Notes")
    cy.contains("Note app 2023")
  })

  it("login form can be opened", function() {
    cy.contains("login").click()
    cy.get("#username").type("josh1")
    cy.get("#password").type("josh222")
    cy.get("button[type='submit']").click()

    cy.contains("josh logged in")
  })
})
