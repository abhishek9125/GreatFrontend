export const groupAnagrams = (words) => {

    const groups = {};

    words.forEach((word) => {
        const sortedWord = word.split('').sort().join('');

        if(!groups[sortedWord]) {
            groups[sortedWord] = {
                title: sortedWord,
                words: []
            }
        }

        groups[sortedWord].words.push(word);
    })

    return Object.values(groups);
}