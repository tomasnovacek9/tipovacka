# v74 – Android diakritika

Úprava registrace/přihlášení:
- pole Jméno a Příjmení jsou explicitně `type=text` + `inputmode=text`,
- zapnuté `autocapitalize=words`, `autocorrect=on`, `spellcheck=true`,
- odstraněné případné omezení znaků/pattern,
- přezdívka dovoluje text, ale nevynucuje změny diakritiky,
- doplněné CSS pro lepší chování vstupů v Android PWA/Chrome.

Test: na Androidu zkus zadat `Tomáš Nováček`, `Šárka Černá`, `Žluťoučký kůň`.
