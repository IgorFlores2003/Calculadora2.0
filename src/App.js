import React, { useEffect, useState } from 'react';
import './index.css';
import gremioLogo from './imagem/Gremio.png';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [selectedOperator, setSelectOperator] = useState(false);
  const [decimalAllowed, setDecimalAllowed] = useState(true);
  const Maxlenth = 10000;

  const setNumber = (number) => {
    if (selectedOperator) {
      if (!decimalAllowed && number === '.') {
        return;
      }
      setDisplayValue((prevValue) =>
        prevValue === '0' || prevValue === 'Não Possível Calcular'
          ? number
          : prevValue + number
      );
      setSelectOperator(false);
      setDecimalAllowed(number !== '.');
    } else {
      if (!decimalAllowed && number === '.') {
        return;
      }
      setDisplayValue((prevValue) =>
        prevValue === '0' || prevValue === 'Não Possível Calcular'
          ? number
          : prevValue + number
      );
      setDecimalAllowed(number !== '.');
    }
  };

  const setOperation = (operation) => {
    if (displayValue === '' || displayValue === 'Não Possível Calcular') {
      return;
    }

    const lastChar = displayValue[displayValue.length - 1];
    const isOperator =
      lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/';

    if (!isOperator) {
      setDisplayValue((prevValue) => prevValue + operation);
      setSelectOperator(true);
      setDecimalAllowed(true);
    }
  };

  const setDot = (dot) => {
    if (!selectedOperator) {
      if (!decimalAllowed) {
        return;
      }
      setDisplayValue((prevValue) => prevValue + dot);
      setSelectOperator(true);
    }
  };

  const clearDisplay = () => {
    setSelectOperator(false);
    setDecimalAllowed(true);
    setDisplayValue('0');
  };

  const deleteDigit = () => {
    if (typeof displayValue === 'string' && displayValue.length > 0) {
      const finalDigit = displayValue[displayValue.length - 1];
      const newValue = displayValue.slice(0, -1);
      if (finalDigit === '.') {
        setDecimalAllowed(true);
      }
      setDisplayValue(newValue || '0');
    }
  };

  const calculateFactorial = (num) => {
    if (num < 0) return 'Não Possível Calcular';
    if (num === 0) return 1;
    if (num > Maxlenth) return "Infinity";
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  const handleEventListener = (event) => {
    const key = event.key;
    if (/^[\d\+\-\*\/\.]$/.test(key)) {
      key === '.' ? setNumber('.') : setNumber(key);
    } else if (key === '!') {
      calculateFactorialAndDisplay();
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      deleteDigit();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEventListener);

    return () => {
      window.removeEventListener('keydown', handleEventListener);
    };
  }, [displayValue]);

  const calculate = () => {
    try {
      if (displayValue.includes('!')) {
        const num = parseInt(displayValue.slice(0, -1), 10);
        if (isNaN(num)) {
          setDisplayValue('Não Possível Calcular');
        } else {
          const result = calculateFactorial(num);
          setDisplayValue(result.toString());
        }
      } else {
        const result = eval(displayValue);
        if (result === Infinity || isNaN(result)) {
          setDisplayValue('Não Possível Calcular');
        } else {
          setDisplayValue(result.toString());
        }
      }
    } catch (error) {
      setDisplayValue('Não Possível Calcular');
    }
  };

  const calculateFactorialAndDisplay = () => {
    const num = parseInt(displayValue, 10);
    if (!isNaN(num)) {
      const result = calculateFactorial(num);
      setDisplayValue(result.toString());
    } else {
      setDisplayValue('Não Possível Calcular');
    }
  };

  const calculatePercentage = () => {
    try {
      const currentValue = eval(displayValue);
      if (!isNaN(currentValue)) {
        const result = currentValue / 100;
        setDisplayValue(result.toString());
      }
    } catch (error) {
      setDisplayValue('Não Possível Calcular');
    }
  };

  return (
    <div 
      className="bg-blue-500 w-80 mx-auto my-10 p-4 rounded-lg shadow-lg sm:w-full md:w-80 shadow-current" 
      style={{ backgroundImage: `url(${gremioLogo})` }}  
    >
      <input className="w-full text-right pr-3 text-2xl bg-white text-black border-1 rounded-lg h-16 border-cyan-500" type='text' value={displayValue} disabled />

      <div className="grid grid-cols-4 gap-4 mt-8">
        <button className="col-span-2 text-xl py-3 bg-gray-800 text-white rounded-lg border-2 border-black" onClick={() => clearDisplay()}>AC</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => deleteDigit()}>Del</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setOperation('/')}>/</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("7")}>7</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("8")}>8</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("9")}>9</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setOperation('*')}>*</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("4")}>4</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("5")}>5</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("6")}>6</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setOperation('-')}>-</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("1")}>1</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("2")}>2</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("3")}>3</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setOperation('+')}>+</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setNumber("0")}>0</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => setDot(".")}>.</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => calculateFactorialAndDisplay()}>!</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => calculatePercentage()}>%</button>
        <button className="text-xl py-3 bg-blue-400 text-white rounded-lg border-2 border-black" onClick={() => calculate()}>=</button>
      </div>
    </div>
  );
}

export default App;
