/// <reference types='cypress' />;

describe('Url Testing', () => {
    it('Checking if url works or not', () => {
        cy.visit('https://affectionate-bhaskara-d4fb5c.netlify.app/');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#addItem').clear();
        cy.get('#addItem').type('apple{enter}');
        cy.get('.item').contains('apple').should('exist');
        cy.wait(3000);
        cy.contains('.item', 'apple').find('svg').click();

        // cy.get(':nth-child(3) > [data-testid="DeleteIcon"] > path').click();
        /* ==== End Cypress Studio ==== */
    });
});
