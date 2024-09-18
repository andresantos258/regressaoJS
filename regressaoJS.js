
function gerarAmostras(numAmostras, numPontos) {
    const amostras = [];
    for (let i = 0; i < numAmostras; i++) {
        const amostra = [];
        for (let j = 0; j < numPontos; j++) {
            const x = Math.random() * 100; 
            const y = 2 * x + Math.random() * 10; 
            amostra.push({ x, y });
        }
        amostras.push(amostra);
    }
    return amostras;
}


function calcularMediaY(amostra) {
    const soma = amostra.reduce((acc, ponto) => acc + ponto.y, 0);
    return soma / amostra.length;
}


function calcularRegressao(amostra) {
    const n = amostra.length;
    const somaX = amostra.reduce((acc, ponto) => acc + ponto.x, 0);
    const somaY = amostra.reduce((acc, ponto) => acc + ponto.y, 0);
    const somaXY = amostra.reduce((acc, ponto) => acc + ponto.x * ponto.y, 0);
    const somaX2 = amostra.reduce((acc, ponto) => acc + ponto.x * ponto.x, 0);

    const m = (n * somaXY - somaX * somaY) / (n * somaX2 - somaX * somaX);
    const b = (somaY - m * somaX) / n;


    const somaResiduosQuadrados = amostra.reduce((acc, ponto) => acc + Math.pow(ponto.y - (m * ponto.x + b), 2), 0);
    const somaTotalQuadrados = amostra.reduce((acc, ponto) => acc + Math.pow(ponto.y - calcularMediaY(amostra), 2), 0);

    const r2 = 1 - (somaResiduosQuadrados / somaTotalQuadrados);

    return { m, b, r2 };
}


const amostras = gerarAmostras(4, 90);

amostras.forEach((amostra, index) => {
    console.log(`Amostra ${index + 1}:`);
    console.table(amostra);
});

const resultados = amostras.map(amostra => {
    const { m, b, r2 } = calcularRegressao(amostra);
    const mediaY = calcularMediaY(amostra);
    return { m, b, r2, mediaY };
});


console.table(resultados);

const mediaR2 = resultados.reduce((acc, resultado) => acc + resultado.r2, 0) / resultados.length;
console.log(`Média de R²: ${mediaR2}`);
