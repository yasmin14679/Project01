//Declara o elemento calculator para todos os elementos que possuem a classe atribuida 'calculator'
const calculator = document.querySelector('.calculator')
//Declara o elemento keys para todos os elementos que possuem a classe atribuida 'calculator__keys'
const keys = calculator.querySelector('.calculator__keys')
//Declara o elemento display para todos os elementos que possuem a classe atribuida 'calculator__display'
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {

      //Declara o elemento key, que recebe o evento
    const key = e.target
    //Declara o elmento action, que recebe o valor do atributo data-action do elemento selecionado.
    const action = key.dataset.action
    //Declara o elemento keyContent e atribui o valor do conteudo(innerHTML) do elemento selecionado.
    const keyContent = key.textContent
    //Declara o elemento displayedNum e atribui o valor do elemento display(innerHTML) para o elemento displayedNum
    const displayedNum = display.textContent
    //declara o elemento previousKeyType
    const previousKeyType = calculator.dataset.previousKeyType

    //verifica as teclas que não possuem o data-action como atributo na TAG(teclas de Números)
    //Imprime no Console Log "Teclas númericas" 
    if (!action) {
            console.log('number key!')
        }

        //verifica as teclas que possuem como valores nos atributos data-action add, subtract, multiply, divide 
        //Imprime no Console Log do navegador "Tecla de operação"
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!');
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        /*    
        / verifica se a tecla possui o valor 'decimal' no atributo data-action
       /Imprime no Console do navegador o texto "Tecla decimal"
       /Atribui o valor ao elemento textContent, do elemento display 
       /o resultado da concatenação do valor do elemento displayedNum e a string '.'
       */    
    if (action === 'decimal') {
            console.log('decimal key!');
            display.textContent = displayedNum + '.' 
          }
          
          /* 
            /verifica se a tecla possui o valor 'clear' no atributo data-action
            /Imprime no Console do navegador o texto "Tecla limpar"
          */
          if (action === 'clear') {
            console.log('clear key!');
            displayedNum = '0';
            display.textContent = displayedNum
          }
          
          /*
          /verifica as teclas que não possuem o data-action como atributo na TAG(teclas de Números)
          /Condição se verdadeiro: 
            Condicional que verifica se o valor atribui ao displayedNum é igual a '0'.
              se verdadeiro, atrubui valor pessionado da Tecla ao conteudo do Display, substituindo o valor'0'.
               Se falso , concatena o valor pressionado da Tecla com o valor armazenado no display 
          /Imprime no Console do navegador o texto "Tecla ="
          */
          if (action === 'calculate') {
            console.log('equal key!');
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            const calculate = (n1, operator, n2) => {
              let result = ''
              
              if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
              } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2);
              } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
              } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
              }
              
              return result;
            }            

            display.textContent = calculate(firstValue, operator, secondValue)
          }

          if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
              display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
              }
          }    
           // Remove a classe .is-depressed de todas as teclas
            Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))
    }
})