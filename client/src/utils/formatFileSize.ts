
export default function(bytes: number) {
    if(bytes > 1024**2) {
        return (bytes / 1024 ** 2).toFixed(1) + ' gb'
    }
    else if(bytes > 1024) {
            return (bytes / 1024).toFixed(1) + ' mb'
    } else return bytes.toFixed(1) + ' kb'
}