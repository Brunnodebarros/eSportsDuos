export function convertHourStringToMinutes(hourString: string){
    const [hours, minutes] = hourString.split(':').map(Number)

    const minutsArround = (hours * 60) + minutes;

    return minutsArround;

}