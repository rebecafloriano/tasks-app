export const formatDate = (dataString: string): string => {
    if (!dataString) return ""
    const date = new Date(`${dataString}T00:00:00`)
    return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}