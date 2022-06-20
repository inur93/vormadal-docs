// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email = 'admin@vormadal.com', password = 'example') => {

    cy.request({
        url: '/auth/login',
        method: 'POST',
        body: { email, password }
    })
        .then(response => {
            console.log('response', response.body);
            cy.window().its('localStorage').invoke('setItem', 'jwt', response.body.jwt);
        })
})