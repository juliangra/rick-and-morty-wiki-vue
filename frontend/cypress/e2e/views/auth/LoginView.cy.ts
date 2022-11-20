describe('LoginView', () => {
  const invalidUsername = 't'

  const randomAvailableUsername = (Math.random() + 1).toString(36).substring(6)
  const randomAvailableEmail = `${randomAvailableUsername}@example.com`

  const validEmail = 'test@example.com'
  const validUsername = 'test'
  const validPassword = 'password'
  const wrongPassword = 'notTheCorrectPassword'

  const NO_USER_FOUND_ERROR = 'No user found with given credentials!'

  beforeEach(() => {
    cy.clearLocalStorage()

    cy.visitHash('/login')
    cy.preventSubmit()
  })

  it('renders login page', () => {
    cy.dataCy('login-form').children().should('have.length.at.least', 1)
  })

  it('should not allow illegal email', () => {
    cy.dataCy('identifier-input').type(invalidUsername)
    cy.get('form').submit()
  })

  it('should not allow no password', () => {
    cy.dataCy('identifier-input').type(invalidUsername)
    cy.get('form').submit()
  })

  it('should not allow wrong user credentials', () => {
    cy.dataCy('identifier-input').type(randomAvailableEmail)
    cy.dataCy('password-input').type(wrongPassword)
    cy.get('form').submit()
    cy.dataCy('alert').should('contain', NO_USER_FOUND_ERROR)
  })

  it('should allow login with username', () => {
    cy.dataCy('identifier-input').type(validUsername)
    cy.dataCy('password-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })

  it('should allow login with email address', () => {
    cy.dataCy('identifier-input').type(validEmail)
    cy.dataCy('password-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })
})
