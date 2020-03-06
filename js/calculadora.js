Calculadora = 
{
	numeros:
	{
		num1 : null,
		num2 : null,
		total : null,
		mrc : 0
	},

	operacoes:
	{
		operacao : null,
		permitir : false
	},

	acoes:
	{ 
		limpar : false,
		memoria : false,
		on : false
	},

	display : function(valor)
	{
		if(valor == 'Infinity') valor = 'Erro: divisão por zero.'
		document.getElementById("Inp_Display").value = valor;
	},

	resetar : function() 
	{ 
		this.numeros.num1 = null;
		this.numeros.num2 = null;
		this.numeros.total = null;

		this.operacoes.operacao = null;
		this.operacoes.permitir = false;

		this.acoes.limpar = false;
		this.acoes.memoria = false;
		this.acoes.on = false;
	},

	desligar : function()
	{
		this.resetar();
		this.numeros.mrc = 0;
	}
};

document.addEventListener('keydown', (event) => {
	const keyName = event.key;

	if(!isNaN(keyName))
	{
		var btn = "Btn_" + keyName;
		document.getElementById(btn).click();
	}
	else
	{
		if(keyName == '+') document.getElementById('Btn_Adc').click();
		else if(keyName == '-') document.getElementById('Btn_Sub').click();
		else if(keyName == '*') document.getElementById('Btn_Mult').click();
		else if(keyName == '/') document.getElementById('Btn_Div').click();
		else if(keyName == '.') document.getElementById('Btn_Ponto').click();
		else if(keyName == ',') document.getElementById('Btn_Ponto').click();
		else if(keyName == 'Enter') 
		{
			event.preventDefault();

			document.getElementById('Btn_Igual').click();
		}
	}
});

function btnAcao_Click(btn) 
{
	
	if(btn.value == 'on')
	{
		Calculadora.resetar();

		document.getElementById("Inp_Display").disabled = false;
		Calculadora.display('0');

		Calculadora.acoes.on = true;
	}

	if(Calculadora.acoes.on == true)
	{
		if(btn.value == 'off')
		{
			Calculadora.desligar();

			Calculadora.display(null);
			document.getElementById("Inp_Display").disabled = true;

			Calculadora.acoes.on = false;
		}
		else if(btn.value == 'del')
		{
			Calculadora.display(document.getElementById("Inp_Display").value.slice(0, document.getElementById("Inp_Display").value.length-1));
		}
		else if(btn.value == 'mrc')
		{
			Calculadora.display(Calculadora.numeros.mrc);

			Calculadora.acoes.memoria = true;
		}
		else if(btn.value == 'madc')
		{
			Calculadora.numeros.mrc += parseFloat(document.getElementById("Inp_Display").value);

			Calculadora.acoes.memoria = true;
		}
		else if(btn.value == 'msub')
		{
			Calculadora.numeros.mrc -= parseFloat(document.getElementById("Inp_Display").value);

			Calculadora.acoes.memoria = true;
		}
	}
}

function btnDigito_Click(btn) 
{
	if(Calculadora.acoes.on == true)
	{
		var digito = btn.value;
		var display = document.getElementById("Inp_Display").value;

		if(Calculadora.acoes.limpar == true || Calculadora.acoes.memoria == true )
		{
			Calculadora.display(null);

			Calculadora.acoes.limpar = false;
			Calculadora.acoes.memoria = false;
		}

		if(display[0] == '0' && display[1] != '.' && digito != '.') Calculadora.display(digito);
		else document.getElementById("Inp_Display").value += digito;

		Calculadora.operacoes.permitir = true;
	}
}

function btnOperacao_Click(btn) 
{
	if(Calculadora.acoes.on == true)
	{
		if(Calculadora.numeros.num1 == null)
		{
			Calculadora.numeros.num1 = parseFloat(document.getElementById("Inp_Display").value);

			Calculadora.operacoes.operacao = btn.value;
			if(Calculadora.operacoes.operacao == '%')
			{
				Calculadora.numeros.num1 = null;
				Calculadora.numeros.total = Calculadora.display(0);
			}
			else if(Calculadora.operacoes.operacao == '√')
			{
				Calculadora.numeros.total = Calculadora.display(Math.sqrt(Calculadora.numeros.num1));
			}

			Calculadora.operacoes.permitir = false;
		}
		else
		{
			if(btn.value == '%')
			{
				if(Calculadora.operacoes.permitir == true)
				{
					Calculadora.numeros.num2 = parseFloat(document.getElementById("Inp_Display").value);

					if(Calculadora.operacoes.operacao == '/') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 / (Calculadora.numeros.num2/100));
					else if(Calculadora.operacoes.operacao == 'x') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * (Calculadora.numeros.num2/100));
					else if(Calculadora.operacoes.operacao == '+') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 + ((Calculadora.numeros.num2/100) * Calculadora.numeros.num1));
					else if(Calculadora.operacoes.operacao == '-') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 - ((Calculadora.numeros.num2/100) * Calculadora.numeros.num1));
					else 
					{
						Calculadora.resetar();

						document.getElementById("Inp_Display").disabled = false;
						Calculadora.display('0');

						Calculadora.acoes.on = true;
					}

					Calculadora.operacoes.permitir = false;

				}
				else
				{	
					if(Calculadora.operacoes.operacao == '/')
					{ 
						if(Calculadora.numeros.num2 == null) Calculadora.numeros.total = Calculadora.display((1/Calculadora.numeros.num1)*100);
						else Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 / (Calculadora.numeros.num2/100));
					}
					else if(Calculadora.operacoes.operacao == 'x')
					{ 
						if(Calculadora.numeros.num2 == null) Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * (Calculadora.numeros.num1/100));
						else Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * (Calculadora.numeros.num2/100));
					}
					else 
					{
						Calculadora.resetar();

						document.getElementById("Inp_Display").disabled = false;
						Calculadora.display('0');

						Calculadora.acoes.on = true;
					}

					Calculadora.operacoes.permitir = false;
				}
			}
			else if(btn.value == '√')
			{
				Calculadora.numeros.num1 = parseFloat(document.getElementById("Inp_Display").value);
				Calculadora.numeros.total = Calculadora.display(Math.sqrt(Calculadora.numeros.num1));
			}
			else
			{
				Calculadora.numeros.num2 = parseFloat(document.getElementById("Inp_Display").value);

				if(Calculadora.operacoes.permitir == true)
				{
					if(Calculadora.operacoes.operacao == '/') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 / Calculadora.numeros.num2);
					else if(Calculadora.operacoes.operacao == 'x') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * Calculadora.numeros.num2);
					else if(Calculadora.operacoes.operacao == '+') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 + Calculadora.numeros.num2);
					else if(Calculadora.operacoes.operacao == '-') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 - Calculadora.numeros.num2);
					
					Calculadora.operacoes.permitir = true;
				}
				else
				{ 
					if(Calculadora.operacoes.operacao == btn.value)
					{
						if(Calculadora.operacoes.operacao == '/') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 / Calculadora.numeros.num1);
						else if(Calculadora.operacoes.operacao == 'x') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * Calculadora.numeros.num1);
						else if(Calculadora.operacoes.operacao == '+') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 + Calculadora.numeros.num1);
						else if(Calculadora.operacoes.operacao == '-') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 - Calculadora.numeros.num1);
					}
					else Calculadora.operacoes.operacao = btn.value;

					Calculadora.operacoes.permitir = false;
				}

				Calculadora.operacoes.operacao = btn.value;
				Calculadora.numeros.num1 = parseFloat(document.getElementById("Inp_Display").value);
			}
		}

		Calculadora.acoes.limpar = true;
	}
}

function btnIgual_Click(btn) 
{
	if(Calculadora.acoes.on == true)
	{
		if(Calculadora.operacoes.permitir == true)
		{
			Calculadora.numeros.num2 = parseFloat(document.getElementById("Inp_Display").value);

			if(Calculadora.operacoes.operacao == '/') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 / Calculadora.numeros.num2);
			else if(Calculadora.operacoes.operacao == 'x') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * Calculadora.numeros.num2);
			else if(Calculadora.operacoes.operacao == '+') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 + Calculadora.numeros.num2);
			else if(Calculadora.operacoes.operacao == '-') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 - Calculadora.numeros.num2);

			Calculadora.numeros.num1 = null;

			Calculadora.operacoes.permitir = true;
		}
		else
		{
			if(Calculadora.operacoes.operacao == '/') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 / Calculadora.numeros.num1);
			else if(Calculadora.operacoes.operacao == 'x') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 * Calculadora.numeros.num1);
			else if(Calculadora.operacoes.operacao == '+') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 + Calculadora.numeros.num1);
			else if(Calculadora.operacoes.operacao == '-') Calculadora.numeros.total = Calculadora.display(Calculadora.numeros.num1 - Calculadora.numeros.num);

			Calculadora.operacoes.permitir = true;
		}
	}
}