/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
const identifiers = {
  treeNodeLabel: '[data-cy=tree-node-label]',
  contextMenuItem: '[data-cy=tree-node-context-menu-item]',
  dialogInput: '[data-cy=dialog-input]',
  dialogOk: '[data-cy=form-dialog-ok]',
  dialogCancel: '[data-cy=form-dialog-cancel]',
  deleteBtn: '[data-cy=delete-btn]'
}

const BASE_URL = Cypress.env('CY_BASE_URL') || 'http://localhost:4000';
describe('Pages', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(BASE_URL);
    cy.get('#email').type(Cypress.env('CY_TEST_USER_EMAIL') || 'admin@vormadal.com');
    cy.get('#password').type(Cypress.env('CY_TEST_USER_PASSWORD') || 'example');
    
    cy.get('#login-btn').click();
  })

  it('Root folder should exist', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get(identifiers.treeNodeLabel).should('have.length', 1);
    cy.get(identifiers.treeNodeLabel).first().should('have.text', "Root");
  })


  it('Create new Page in root', () => {
    // We'll store our item text in a variable so we can reuse it
    const pageName = 'Why is this so easy?';

    cy.intercept('POST', '/pages').as('createPage');
    cy.wait(1000); //wait for async re-render
    cy.get(identifiers.treeNodeLabel).should('have.length', 1)

    cy.get(identifiers.treeNodeLabel).rightclick();    
    cy.get(identifiers.contextMenuItem).should('have.length', 3);
    cy.get(identifiers.contextMenuItem).first().should('have.text', 'Add Page');
    cy.get(identifiers.contextMenuItem).first().click();

    cy.get(identifiers.dialogInput).type(pageName);
    cy.get(identifiers.dialogOk).click();

    cy.wait('@createPage').its('request.body').should()
  })

  it('Navigate to page', () => {


  })
  context('with a checked task', () => {
    beforeEach(() => {

    })

    it('can filter for uncompleted tasks', () => {

    })

    it('can filter for completed tasks', () => {

    })

    it('can delete all completed tasks', () => {

    })
  })
})
