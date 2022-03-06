describe('Test pour tester les tests', () => {
    let petite_val = 0
    let grande_val = 1


    test('Test de supériorité', () => {
        expect(grande_val).toBeGreaterThan(petite_val)
    })


    test("Test d'infériorité", () => {
        expect(petite_val).toBeLessThan(grande_val)
    })
})