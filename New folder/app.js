// -----selectors------- 
const circle1 = document.querySelector('#inn-cir');
const textarea = document.querySelector('#text-input');
// -----selectors------- 

circle1.addEventListener('click', e => {
    circle1.innerText = "0%"
    let speech = new SpeechSynthesisUtterance();
    console.log(speech)
    speech.volume = 1;
    speech.text = textarea.value;
    speech.onboundary = onboundaryHandler;
    speech.onend = (event) => {
        textarea.setSelectionRange(0, 0);
    }
    window.speechSynthesis.speak(speech);
});


function onboundaryHandler(event){
    var value = textarea.value;
    var index = event.charIndex;
    var word = getWordAt(value, index);
    var anchorPosition = getWordStart(value, index);
    var activePosition = anchorPosition + word.length;

    circle1.innerText = `${Math.round((activePosition / value.length) * 100)}%`
    
    textarea.focus();
    
    if (textarea.setSelectionRange) {
       textarea.setSelectionRange(anchorPosition, activePosition);
    }
    else {
       var range = textarea.createTextRange();
       range.collapse(true);
       range.moveEnd('character', activePosition);
       range.moveStart('character', anchorPosition);
       range.select();
    }
};

// Get the word of a string given the string and index
function getWordAt(str, pos) {
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    var left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }
    
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
}

// Get the position of the beginning of the word
function getWordStart(str, pos) {
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning
    var start = str.slice(0, pos + 1).search(/\S+$/);
    return start;
}

