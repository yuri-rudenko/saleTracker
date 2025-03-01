export default function cleanArray(array) {
    return array.filter(element => element !== null && element !== undefined);
}