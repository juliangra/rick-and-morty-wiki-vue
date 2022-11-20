describe('RegisterView', () => {
  const invalidEmail = 'not.valid.email'
  const invalidUsername = 't'
  const invalidPassword = 'abcde'

  const validEmail = 'username@example.com'
  const validPassword = 'abcdefgh'
  const differentValidPassword = 'ijklmno'

  const availableUsername = 'username1'
  const randomAvailableUsername = (Math.random() + 1).toString(36).substring(6)
  const randomAvailableEmail = `${randomAvailableUsername}@example.com`

  const unavailableEmail = 'test@example.com'
  const unavailableUsername = 'test'

  const EMAIL_IN_USE_ERROR = 'Email is already in use.'
  const USERNAME_IN_USE_ERROR = 'Username is already in use.'

  beforeEach(() => {
    cy.clearLocalStorage()

    cy.visitHash('/register')
    cy.preventSubmit()
  })

  it('renders register page', () => {
    cy.dataCy('register-form').children().should('have.length.at.least', 1)
  })

  it('does not allow illegal email', () => {
    cy.dataCy('email-input').type(invalidEmail)
    cy.get('form').submit()
  })

  it('does not allow username less than 2 characters', () => {
    cy.dataCy('username-input').type(invalidUsername)
    cy.get('form').submit()
  })

  it('does not allow passwords less than 6 characters', () => {
    cy.dataCy('password-input').type(invalidPassword)
    cy.dataCy('repeatPassword-input').type(invalidPassword)
    cy.get('form').submit()
  })

  it('does not allow passwords that do not match', () => {
    cy.dataCy('password-input').type(validPassword)
    cy.dataCy('repeatPassword-input').type(differentValidPassword)
    cy.get('form').submit()
  })

  it('does not allow already registered email', () => {
    cy.dataCy('email-input').type(unavailableEmail)
    cy.dataCy('username-input').type(availableUsername)
    cy.dataCy('password-input').type(validPassword)
    cy.dataCy('repeatPassword-input').type(validPassword)
    cy.get('form').submit()
    cy.dataCy('alert').should('contain', EMAIL_IN_USE_ERROR)
  })

  it('does not allow already registered username', () => {
    cy.dataCy('email-input').type(validEmail)
    cy.dataCy('username-input').type(unavailableUsername)
    cy.dataCy('password-input').type(validPassword)
    cy.dataCy('repeatPassword-input').type(validPassword)
    cy.get('form').submit()
    cy.dataCy('alert').should('contain', USERNAME_IN_USE_ERROR)
  })

  it('can register and login user', () => {
    cy.dataCy('email-input').click().type(randomAvailableEmail)
    cy.dataCy('username-input').type(randomAvailableUsername)
    cy.dataCy('password-input').type(validPassword)
    cy.dataCy('repeatPassword-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })
})
