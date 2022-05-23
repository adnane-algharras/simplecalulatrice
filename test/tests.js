$(function () {
  mocha.setup('bdd');
  chai.should();

  describe('Tests unitaires', function () {
    describe('Addition', function () {
      it('Doit être capable d additionner deux nombres entiers positifs', function () {
        // 1500 + 2000 = 3500
        Start().press(1).press(5).press(0).press(0)
               .press('+')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('3000');

        // 1 + 2 = 3
        Start().press(1).press('+').press(2).press('=').end.should.equal('3');
      });

      it('Devrait être capable d ajouter un entier négatif à un flottant positif ' +
         'nombre de points', function () {
        // -1 + 1.0000 = 0
        Start().press('-').press(1)
               .press('+')
               .press(1).press('.').press(0).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('0');
      });

      it('Doit être capable d ajouter un nombre à virgule flottante à un entier',
      function () {
        // 10.1 + 2 = 12.1
        Start().press(1).press(0).press('.').press(1)
               .press('+')
               .press(2)
               .press('=')
               .end.should.equal('12.1');
      })

      it('Doit être capable d ajouter un entier à un nombre à virgule flottante',
      function () {
        // 10 + 9.9999 = 19.9999
        Start().press(1).press(0)
               .press('+')
               .press(9).press('.').press(9).press(9).press(9).press(9)
               .press('=')
               .end.should.equal('19.9999');
      });

      it('Doit être capable d ajouter deux nombres à virgule flottante', function () {
        // 34.999 + 1.0 = 35.999
        Start().press(3).press(4).press('.').press(9).press(9).press(9)
               .press('+')
               .press(1).press('.').press(0)
               .press('=')
               .end.should.equal('35.999');
      });

      it('Devrait être capable d ajouter un entier négatif et zéro', function () {
        // -5 + 0 = -5
        Start().press('-').press(5)
               .press('+')
               .press(0)
               .press('=')
               .end.should.equal('-5');
      });

      it('Doit être capable d ajouter zéro et un entier positif', function () {
        // 0 + 5 = 5
        Start().press(0)
               .press('+')
               .press(5)
               .press('=')
               .end.should.equal('5');
      });

      it('Doit être capable d ajouter un entier négatif avec un nombre positif',
      function () {
        // -5 + 5 = 0
        Start().press('-').press(5)
               .press('+')
               .press(5)
               .press('=')
               .end.should.equal('0');
      });

      it('Doit être capable d additionner deux grands entiers positifs', function () {
        // 300000000 + 900000000 = 1.2e+9
        Start().press(3).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('+')
               .press(9).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('1.2e+9');

        // 900000000 + 900000000 = 1.8e+9
        Start().press(9).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('+')
               .press(9).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('1.8e+9');

        // 999999999 + 1 = 1.0e+9
        Start().press(9).press(9).press(9).press(9).press(9).press(9).press(9).press(9).press(9)
               .press('+')
               .press(1)
               .press('=')
               .end.should.equal('1e+9');
      });

      it('Devrait pouvoir ajouter une virgule flottante négative et une positive ' +
         'entier', function () {
        // -1987.50 + 1987 = -0.5
        Start().press('-').press(1).press(9).press(8).press(7).press('.').press(5).press(0)
               .press('+')
               .press(1).press(9).press(8).press(7)
               .press('=')
               .end.should.equal('-0.5');
      });

      it('Devrait être capable d ajouter un entier positif aux résultats d un ' +
         'opération précédente', function () {
        // 1500 - 2000 = -500 + 500 = 0
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(5).press(0).press(0)
              .press('=')
              .end.should.equal('0');

        // 6 * 2 + 8 = 20
        var result2 = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result2.end.should.equal('12');
        result2.press('+')
              .press(8)
              .press('=')
              .end.should.equal('20');
      });

      it('Devrait être capable d ajouter un nombre à virgule flottante positif au ' +
         'résultats d une opération précédente', function () {
        // 1500 - 2000 = -500 + 0.25 = -499.75
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(0).press('.').press(2).press(5)
              .press('=')
              .end.should.equal('-499.75');
      });

      it('Devrait être capable d ajouter un nombre à virgule flottante avec de nombreuses décimales ' +
         'place à un résultat précédent', function () {
        // 1500 - 2000 = -500 + 1.23456789 = -498.765432
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(1).press('.').press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-498.765432');
      });

      it('Doit être capable d ajouter un grand nombre entier à un résultat précédent',
      function () {
        // 1500 - 2000 = -500 + 123456789 = 123456289
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('123456289');
      });
    });

  });

  mocha.run();
});
