describe( 'Ventana principal', () => {
  it('tiene el encabezado correcto', () => {
    cy.visit('http://localhost:4200');
    cy.contains('whislist');
    cy.get('h2').should('contain', 'ESTA ES UNA PRUEBA');
  });

  it('El contador de clicks empieza en 0', () => {
    cy.visit('http://localhost:4200');
    cy.contains('whislist');
    cy.get('h3').should('contain', 'Clicks: 0');
  });

  it('Alerta nombre requerido', () => {
    cy.visit('http://localhost:4200');
    cy.contains('whislist');
    cy.get('div').should('contain', 'Nombre Requerido');

  });

});
