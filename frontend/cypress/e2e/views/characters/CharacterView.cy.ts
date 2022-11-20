describe('CharacterView', () => {
  const randomAvailableUsername = (Math.random() + 1).toString(36).substring(6)
  const randomAvailableEmail = `${randomAvailableUsername}@example.com`

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('renders if ID is valid', () => {
    cy.visitHash('/characters/1')
    cy.url().should('include', 'characters/1')
  })

  it('can rate character if logged in', async () => {
    cy.visitHash('/register')
    cy.dataCy('email-input').type(randomAvailableEmail)
    cy.dataCy('username-input').type(randomAvailableUsername)
    cy.dataCy('password-input').type('password')
    cy.dataCy('repeatPassword-input').type('password')
    cy.get('form').submit()
    cy.hash().should('equal', '#/')

    cy.visitHash('/characters/1')

    cy.dataCy('rating-slider').click().invoke('val', 5)
    cy.dataCy('delete-rating-button').should('exist')
  })
})
