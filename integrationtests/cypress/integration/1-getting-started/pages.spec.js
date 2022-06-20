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
const ids = {
  treeNodeLabel: '[data-cy=tree-node-label]',
  contextMenuItem: '[data-cy=tree-node-context-menu-item]',
  dialogInput: '[data-cy=dialog-input]',
  dialogOk: '[data-cy=form-dialog-ok]',
  dialogCancel: '[data-cy=form-dialog-cancel]',
  deleteBtn: '[data-cy=delete-btn]'
}

describe('Pages', () => {
  beforeEach(() => {

    cy.login();
    cy.visit('/')
  })

  it('Root folder should exist', () => {
    cy.get(ids.treeNodeLabel).should('have.length', 1);
    cy.get(ids.treeNodeLabel).first().should('have.text', "Root");
  })


  it('Create new Page in root', () => {
    const pageName = 'Why is this so easy?';

    cy.intercept('POST', '/pages').as('createPage');
    cy.wait(1000); //wait for async re-render
    cy.get(ids.treeNodeLabel).should('have.length', 1)

    cy.get(ids.treeNodeLabel).rightclick();    
    cy.get(ids.contextMenuItem).should('have.length', 3);
    cy.get(ids.contextMenuItem).first().should('have.text', 'Add Page');
    cy.get(ids.contextMenuItem).first().click();

    cy.get(ids.dialogInput).type(pageName);
    cy.get(ids.dialogOk).click();
  })

})
