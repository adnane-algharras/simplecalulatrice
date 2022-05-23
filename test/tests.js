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

    describe('Soustraction', function () {
      it('Doit être capable de soustraire deux entiers positifs', function () {
        // 1500 - 2000 = -500
        Start().press(1).press(5).press(0).press(0)
               .press('-')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('-500');

        // 9 - 3 = 6
        Start().press(9).press('-').press(6).press('=').end.should.equal('3');
      });

      it('Doit être capable de soustraire zéro d un entier négatif',
      function () {
        // -3 - 0 = -3
        Start().press('-').press(3)
               .press('-')
               .press(0)
               .press('=')
               .end.should.equal('-3');
      });

      it('Doit être capable de soustraire 0 d un entier positif', function () {
        // 3 - 0 = 3
        Start().press(3).press('-').press(0).press('=').end.should.equal('3');
      });

      it('Doit être capable de soustraire un nombre à virgule flottante d un nombre négatif ' +
         'entier', function () {
        // -1 - 2.25 = -3.25
        Start().press('-').press(1)
             .press('-')
             .press(2).press('.').press(2).press(5)
             .press('=')
             .end.should.equal('-3.25');
      });

      it('Doit être capable de soustraire un nombre entier des résultats d un ' +
         'opération précédente', function () {
        // 1500 - 2000 = -500 - 500 = -1000
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(5).press(0).press(0)
              .press('=')
              .end.should.equal('-1000');

        // 6 * 2 = 12 - 8 = 4
        var result = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result.end.should.equal('12');
        result.press('-')
              .press(8)
              .press('=')
              .end.should.equal('4');
      });

      it('Doit être capable de soustraire un entier d un nombre à virgule flottante',
      function () {
        // 9.35 - 1 = 8.35
        Start().press(9).press('.').press(3).press(5)
               .press('-')
               .press(1)
               .press('=')
               .end.should.equal('8.35');
      });

      it('Doit être capable de soustraire un nombre à virgule flottante d un entier',
      function () {
        // 9 - 1.35 = 7.65
        Start().press(9)
               .press('-')
               .press(1).press('.').press(3).press(5)
               .press('=')
               .end.should.equal('7.65');
      })

      it('Doit être capable de soustraire deux nombres à virgule flottante', function () {
        // 0.29 - 1.35 = -1.06
        Start().press(0).press('.').press(2).press(9)
               .press('-')
               .press(1).press('.').press(3).press(5)
               .press('=')
               .end.should.equal('-1.06');
      });

      it('Doit être capable de soustraire deux nombres à virgule flottante à entrée maximale',
      function () {
        // 7.1234567 - 2.2109876 = 4.9124691
        Start().press(7).press('.').press(1).press(2).press(3).press(4).press(5).press(6).press(7)
               .press('-')
               .press(2).press('.').press(2).press(1).press(0).press(9).press(8).press(7).press(6)
               .press('=')
               .end.should.equal('4.9124691');
      });

      it('Une addition d un addend négatif à virgule flottante, à un entier ' +
         'addend doit être traité comme une soustraction d un entier positif ' +
         'soustraire', function () {
        // 1000 + - 10.99 = 989.01
        Start().press(1).press(0).press(0).press(0)
               .press('+')
               .press('-')
               .press(1).press(0).press('.').press(9).press(9)
               .press('=')
               .end.should.equal('989');
      });

      it('Un ajout d un addend négatif à virgule flottante doit être traité ' +
         'sous la forme d une soustraction d une soustraction à virgule flottante positive',
      function () {
        // -1.0 + - 989.99
        Start().press('-').press(1).press('.').press(0)
               .press('+')
               .press('-')
               .press(9).press(8).press(9).press('.').press(9).press(9)
               .press('=')
               .end.should.equal('-990.99');
      });

      it('Une addition d un nombre entier négatif doit être traitée comme un ' +
         'soustraction d un nombre entier positif', function () {
        // 50 + - 60 = -10
        Start().press(5).press(0)
               .press('+')
               .press('-')
               .press(6).press(0)
               .press('=')
               .end.should.equal('-10');
      });

      it('Une addition d un entier négatif s ajoute à un autre négatif ' +
         'addend entier doit être traité comme un ' +
         'soustraction d un nombre entier positif', function () {
        // -5 + - 20 = -25
        Start().press('-').press(5)
               .press('+')
               .press('-')
               .press(2).press(0)
               .press('=')
               .end.should.equal('-25');
      });

      it('Doit pouvoir soustraire un nombre à virgule flottante du résultat ' +
         'd une opération précédente', function () {
        // 1500 - 2000 = -500 - 33.12 = -533.12
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(3).press(3).press('.').press(1).press(2)
              .press('=')
              .end.should.equal('-533.12');
      });

      it('Devrait être capable de soustraire un entier d un flottant négatif ' +
         'nombre de points', function () {
        // -1.33 - 2 = -3.33
        Start().press('-').press(1).press('.').press(3).press(3)
               .press('-')
               .press(2)
               .press('=')
               .end.should.equal('-3.33');
      });

      it('Doit être capable de soustraire deux grands nombres entiers', function () {
        // 123456789 - 210987654 = -87530865
        Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('-')
               .press(2).press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('-87530865');
      });

      it('Devrait être capable de soustraire deux nombres à virgule flottante avec beaucoup' +
         'chiffres', function () {
        // 7.12345678 - 2.21098765 = 4.91246913
        Start().press(7).press('.').press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8)
               .press('-')
               .press(2).press('.').press(2).press(1).press(0).press(9).press(8).press(7).press(6).press(5)
               .press('=')
               .end.should.equal('4.91246913');
      });

      it('Doit être capable de soustraire un grand nombre décimal des résultats ' +
         'd un résultat précédent', function () {
        // 1500 - 2000 = -500 - 12.3456789 = -512.3456789
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(1).press(2).press('.').press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-512.345679');
      });

      it('Doit être capable de soustraire un grand nombre entier des résultats d un ' +
         'résultat précédent', function () {
        // 1500 - 2000 = -500 - 123456789 = -123457289
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-123457289');
      });
    });

    describe('Multiplication', function () {
      it('Doit être capable de multiplier deux nombres entiers positifs', function () {
        // 1500 * 2000 = 3000000
        Start().press(1).press(5).press(0).press(0)
               .press('*')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('3000000');

        // 6 * 2 = 12
        Start().press(6).press('*').press(2).press('=').end.should.equal('12');
      });

      it('Doit être capable de multiplier un multiplicande à virgule flottante avec un ' +
         'multiplicateur entier', function () {
        // 1.212 * 8 = 9696
        Start().press(1).press('.').press(2).press(1).press(2)
               .press('*')
               .press(8)
               .press('=')
               .end.should.equal('9.696');
      });

      it('Doit être capable de multiplier un multiplicande entier avec un flottant ' +
         ' multiplicateur de points', function () {
        // 3 * 1.212 = 3.636
        Start().press(3)
               .press('*')
               .press(1).press('.').press(2).press(1).press(2)
               .press('=')
               .end.should.equal('3.636');
      });

      it('Doit être capable de multiplier deux nombres à virgule flottante', function () {
        // 0.133 * 1.212 = 0.161196
        Start().press(0).press('.').press(1).press(3).press(3)
               .press('*')
               .press(1).press('.').press(2).press(1).press(2)
               .press('=')
               .end.should.equal('0.161196');
      });

      it('Doit pouvoir multiplier un multiplicande entier par zéro',
      function () {
        // 1500 * 0 = 0
        Start().press(1).press(5).press(0).press(0)
               .press('*')
               .press(0)
               .press('=')
               .end.should.equal('0');
      });

      it('Doit pouvoir multiplier un multiplicande entier négatif par un ' +
         'multiplicateur entier positif', function () {
        // -1500 * 2000 = -3000000
        Start().press('-').press(1).press(5).press(0).press(0)
               .press('*')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('-3000000');
      });

      it('Doit être capable de multiplier un multiplicande à virgule flottante négatif ' +
         'avec un multiplicateur entier positif', function () {
        // -1.212 * 8 = -9.696
        Start().press('-').press(1).press('.').press(2).press(1).press(2)
               .press('*')
               .press(8)
               .press('=')
               .end.should.equal('-9.696');
      });

      it('Doit pouvoir multiplier un multiplicande entier négatif par un ' +
         'multiplicateur à virgule flottante positif', function () {
        // -8 * 1.212 = -9.696
        Start().press('-').press(8)
               .press('*')
               .press(1).press('.').press(2).press(1).press(2)
               .press('=')
               .end.should.equal('-9.696');
      });

      it('Doit être capable de multiplier le résultat d une opération précédente par un ' +
         'nombre à virgule flottante positif', function () {
        // 1500 - 2000 = -500 * 1.23 = -615
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press('.').press(2).press(3)
              .press('=')
              .end.should.equal('-615');
      });
      it('Doit être capable de multiplier le résultat d une opération précédente par un ' +
         'entier positif', function () {
        // 1500 - 2000 = -500 * 123 = -61500
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press(2).press(3)
              .press('=')
              .end.should.equal('-61500');

        // 6 * 2 = 12 * 8 = 96
        var result2 = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result2.end.should.equal('12');
        result2.press('*')
              .press(8)
              .press('=')
              .end.should.equal('96');
      });
      it('Doit être capable de multiplier deux nombres à plusieurs chiffres à virgule flottante',
      function () {
        // 1.23456789 * 2.10987654 = 2.60478583
        Start().press(1).press('.').press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('*')
               .press(2).press('.').press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('2.60478583');
      });
      it('Doit être capable de multiplier deux grands nombres entiers', function () {
        // 123456789 * 210987654 = 2.60478583e+16
        Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('*')
               .press(2).press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('2.60478583e+16');
      });

      it('Doit pouvoir multiplier le résultat d une opération précédente par ' +
         'grand entier', function () {
        // 1500 - 2000 = -500 * 123456789 = -6.17283945e+10
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-6.17283945e+10');
      });

      it('Doit être capable de multiplier le résultat d une opération précédente par un ' +
         'nombre à virgule flottante à plusieurs chiffres', function () {
        // 1500 - 2000 = -500 * 123.456789 = -61728.3945
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press(2).press(3).press('.').press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-61728.3945');
      });

      it('Doit pouvoir résulter d une opération précédente lorsque la précédente ' +
         'le résultat est nul', function () {
        // 0 * 6 * 6 = 0
        Start().press(0).press('*').press(6).press('*').press(6).press('=')
               .end.should.equal('0');
      });
    });

    describe('Division', function () {
      it('Doit être capable de diviser deux nombres entiers positifs', function () {
        // 1500 / 2000 = 0.75
        Start().press(1).press(5).press(0).press(0)
               .press('/')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('0.75');

        // 6 / 2 = 3
        Start().press(6).press('/').press(2).press('=').end.should.equal('3');
      });

      it('Doit être capable de diviser 0 par un diviseur entier', function () {
        // 0 / 2000 = 0
        Start().press(0)
             .press('/')
             .press(2).press(0).press(0).press(0)
             .press('=')
             .end.should.equal('0');
      });

      it('Doit pouvoir diviser un dividende négatif par un diviseur positif',
      function () {
        // -1500 / 2000 = -0.75
        Start().press('-').press(1).press(5).press(0).press(0)
               .press('/')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('-0.75');
      });

      it('Should be able to divide a negative floating point dividend by a ' +
         'diviseur positif', function () {
        // -3.123 / 5 = -0.6246
        Start().press('-').press(3).press('.').press(1).press(2).press(3)
               .press('/')
               .press(5)
               .press('=')
               .end.should.equal('-0.6246');
      });

      it('Doit être capable de diviser un entier négatif divisé par un positif ' +
         'division en virgule flottante en neuf chiffres significatifs', function () {
        // -5 / 3.123 = -1.60102466
        Start().press('-').press(5)
               .press('/')
               .press(3).press('.').press(1).press(2).press(3)
               .press('=')
               .end.should.equal('-1.60102466');
      });

      it('Doit être capable de diviser un dividende en virgule flottante par un nombre entier ' +
         'diviseur', function () {
        // 4.21 / 3 = 1.40333333
        Start().press(4).press('.').press(2).press(1)
               .press('/')
               .press(3)
               .press('=')
               .end.should.equal('1.40333333');
      });

      it('Doit pouvoir diviser un dividende entier par une virgule flottante ' +
         'diviseur', function () {
        // 10 / 3.123 = 3.20204931
        Start().press(1).press(0)
               .press('/')
               .press(3).press('.').press(1).press(2).press(3)
               .press('=')
               .end.should.equal('3.20204931');
      });

      it('Doit être capable de diviser deux nombres à virgule flottante', function () {
        // 0.234 / 3.123 = 0.0749279539
        Start().press(0).press('.').press(2).press(3).press(4)
               .press('/')
               .press(3).press('.').press(1).press(2).press(3)
               .press('=')
               .end.should.equal('0.0749279539');
      });

      it('Doit être capable de diviser le résultat d une opération précédente par un ' +
         'nombre à virgule flottante positif', function () {
        // 1500 - 2000 = 500 / 3.12 = -160.25641
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(3).press('.').press(1).press(2)
              .press('=')
              .end.should.equal('-160.25641');
      });

      it('Doit être capable de diviser le résultat d une opération précédente par un ' +
         'entier positif', function () {
        // 1500 - 2000 = 500 / 312 = -1.6025641
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(3).press(1).press(2)
              .press('=')
              .end.should.equal('-1.6025641');

        // 6 * 2 = 12 / 8 = 1.5
        var result2 = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result2.end.should.equal('12');
        result2.press('/')
              .press(8)
              .press('=')
              .end.should.equal('1.5');
      });

      it('Devrait signaler une erreur pour la division par 0', function () {
        // 1500 / 0 = Error
        Start().press(1).press(5).press(0).press(0)
             .press('/')
             .press(0)
             .press('=')
             .end.should.equal('Error');
        // 6 / 0 = Error
        Start().press(6).press('/').press(0).press('=').end.should.equal('Error');
      });

      it('Doit être capable de diviser deux nombres à virgule flottante à plusieurs chiffres',
      function () {
        // 1.23456789 / 2.10987654 = 0.585137503
        Start().press(1).press('.').press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('/')
               .press(2).press('.').press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('0.585137503');
      });

      it('Doit être capable de diviser le résultat d une opération précédente par un ' +
         'nombre à virgule flottante à plusieurs chiffres', function () {
        // 1500 - 2000 = -500 / 1234.56789 = -0.405000004
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(1).press(2).press(3).press(4).press('.').press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-0.405000004');
      });

      it('Doit être capable de diviser le résultat d une opération précédente par un ' +
         'grand entier', function () {
        // 1500 - 2000 = -500 / 123456789 = -0.00000405000004
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-0.00000405000004');
      });
    });

    describe('Clear', function () {
      it('Doit être capable d effacer l écran après avoir inséré un négatif ' +
         'floating point number', function () {
        // -12.3 C -> 0
        Start().press('-').press(1).press(2).press('.').press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Devrait être capable d effacer l écran après avoir inséré un positif ' +
         'nombre à virgule flottante', function () {
        // 12.3 C -> 0
        Start().press(1).press(2).press('.').press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Doit être capable d effacer l écran après avoir inséré un négatif ' +
         'entier', function () {
        // -123 C -> 0
        Start().press('-').press(1).press(2).press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Devrait être capable d effacer l écran après avoir inséré un positif ' +
         'entier', function () {
        // 123 C -> 0
        Start().press(1).press(2).press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Devrait permettre d appuyer plusieurs fois sur clear', function () {
        // 123456789 C C C -> 0
        var result = Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
                            .press('C');
        result.end.should.equal('0');
        result = result.press('C');
        result.end.should.equal('0');
        result = result.press('C');
        result.end.should.equal('0');
      });

      it('Devrait être en mesure d effacer après avoir inséré plusieurs chiffres ' +
         'nombre à virgule flottante', function () {
        // 1234.56789 C -> 0
        Start().press(1).press(2).press(3).press(4).press('.').press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });

      it('Devrait pouvoir être effacé après avoir inséré un nombre négatif ' +
         'nombre à virgule flottante', function () {
        // -1234.56789 C -> 0
        Start().press('-').press(1).press(2).press(3).press(4).press('.').press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });

      it('Devrait pouvoir être effacé après l insertion d un grand nombre entier négatif',
      function () {
        // -123456789 C -> 0
        Start().press('-').press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });

      it('Devrait être en mesure d effacer après l insertion d un grand nombre entier', function () {
        // 123456789 C -> 0
        Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });
    });

    describe('Mauvaise entrée', function () {
      it('Devrait traiter une pression initiale de la marque décimale comme "0."',
      function () {
        // .11111 -> 0.11111
        Start().press('.').press(1).press(1).press(1).press(1).press(1)
               .end.should.equal('0.11111');
      });

      it('Ne devrait pas autoriser plusieurs zéros en entrée', function () {
        // 0000 -> 0
        Start().press(0).press(0).press(0).press(0).end.should.equal('0');
      });

      it('Ne devrait pas autoriser plusieurs zéros avant une marque décimale', function () {
        // 000.11111 -> 0.11111
        Start().press(0).press(0).press(0).press('.').press(1).press(1).press(1).press(1).press(1)
               .end.should.equal('0.11111');
      });

      it('Ne doit pas autoriser un zéro avant un autre chiffre d entrée', function () {
        // 06 -> 6
        Start().press(0).press(6).end.should.equal('6');
      });

      it('Ne devrait pas autoriser un zéro avant un autre chiffre d entrée pendant une seconde ' +
         'opérande', function () {
        // 6 * 06 -> 6
        Start().press(6).press('*').press(0).press(6).end.should.equal('6');
      });

      it('Doit permettre à un premier opérande décimal d afficher un zéro non significatif ' +
         'après la virgule', function () {
        // 1111.11111 -> 1111.11111
        Start().press(1).press(1).press(1).press(1).press('.').press(1).press(1).press(1).press(1).press(1)
             .end.should.equal('1111.11111');
        // 123.567 -> 123.567
        Start().press(1).press(2).press(3).press('.').press(5).press(6).press(7)
               .end.should.equal('123.567');
      });

      it('Doit permettre à un premier opérande décimal d afficher un zéro non significatif',
      function () {
        // 0.6 -> 0.6
        Start().press(0).press('.').press(6).end.should.equal('0.6');
        // .6 -> 0.6
        Start().press('.').press(6).end.should.equal('0.6');
      });

      it('Doit permettre au deuxième opérande décimal d afficher un zéro non significatif',
      function () {
        // 6 * 0.6 -> 0.6
        Start().press(6)
               .press('*')
               .press(0).press('.').press(6)
               .end.should.equal('0.6');
        // 6 * .6 -> 0.6
        Start().press(6)
               .press('*')
               .press('.').press(6)
               .end.should.equal('0.6');
      });

      it('Devrait permettre une entrée en virgule flottante avec un seul chiffre avant et ' +
         'après la virgule', function () {
        // 1.1 -> 1.1
        Start().press(1).press('.').press(1).end.should.equal('1.1');
      });

      it('Ne doit pas compter une marque décimale par rapport à l entrée maximale', function () {
        // 12.3456789 -> 12.3456789
        Start().press(1).press(2).press('.').press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .end.should.equal('12.3456789');
      });

      it('Ne devrait pas permettre une double négation', function () {
        // - - 21 =
        Start().press('-').press('-').press(2).press(1).press('=')
               .end.should.equal('-21');
      });

      it('Devrait autoriser l entrée maximale lorsque le premier chiffre est zéro', function () {
        // 0123456789 -> 123456789
        Start().press(0).press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .end.should.equal('123456789');
      });
    });
  });

  mocha.run();
});
