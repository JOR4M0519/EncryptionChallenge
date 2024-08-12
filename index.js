

const cryptDictionary = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat'],
    ['á', 'ai'],
    ['é', 'enter'],
    ['í', 'imes'],
    ['ó', 'ober'],
    ['ú', 'ufat']
]);
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy');

    copyButton.addEventListener('click', () => {
        // Selecciona el contenido del textarea
        outputTextArea.select();
        outputTextArea.setSelectionRange(0, 99999); // Para dispositivos móviles

        // copia el contenido al portapapeles
        try {
            document.execCommand('copy');
            alert('Texto copiado al portapapeles!');
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err);
        }
    });

    const clearButton = document.getElementById('clear');

    clearButton.addEventListener('click',() =>{
        document.getElementById("inputTextArea").value = ""
        document.getElementById("outputTextArea").value = ""
    })
});

function validarTexto(text) {
    const regex = /^[a-z ]*$/;

    if (!regex.test(text)) return false;
    
    return true;
}

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
        if (value === searchValue) {
            return key;
        }
    }
    return null; // En caso de que no se encuentre el valor
}

function desencrypt(){
    time = 200;
    animarLock(time);
    let text = document.getElementById("inputTextArea").value.toLowerCase();
    if(!validarTexto(text)) {
        alert("Carácteres invalidos")
        return
    }         
    // Reemplazar secuencias encriptadas por las vocales originales
    // Ordenar las secuencias encriptadas por longitud descendente para evitar problemas de sustitución parcial
    const sortedValues = Array.from(cryptDictionary.values()).sort((a, b) => b.length - a.length);
            
    for (const value of sortedValues) {
        const key = getByValue(cryptDictionary, value);
        text = text.split(value).join(key);
    }
    setTimeout(() => {
    document.getElementById("outputTextArea").value = text;
    },time+100)
}



function encrypt(){
    time = 200;
    animarLock(time);
    let text = (document.getElementById("inputTextArea").value).toLowerCase();
    if(!validarTexto(text)) {
        alert("Carácteres invalidos")
        return
    } 
    text = text.replace(/[aeiou]/g, letra => cryptDictionary.get(letra));
    setTimeout(() => {
        document.getElementById("outputTextArea").value = text;
    },time+100)    
}



function animarLock(time) {
    const svgElement = document.getElementById('lock');
    // Rota 90 grados a la izquierda
    svgElement.style.transform = 'rotate(-90deg)';
    setTimeout(() => {
        // Rota 90 grados a la derecha
        svgElement.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            // Rota otros 90 grados a la derecha
            svgElement.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                // Vuelve a la posición inicial
                svgElement.style.transform = 'rotate(0deg)';
            }, time);
        }, time);
    }, time);
  }
  
