export default function convertHourToMinutes(time: string) {
    /* Split "8:00" in "8", "00" and then convert to Number */
    const [hour, minutes] = time.split(':').map(Number)
    const TimeInMinutes = (hour * 60) + minutes

    return TimeInMinutes
}