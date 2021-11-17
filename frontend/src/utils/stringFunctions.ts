import { differenceInDays, format, isSameYear } from 'date-fns';


export const fancyDate = (dateStr?: string) =>{
    const date = new Date(dateStr || 0);
    const now = new Date();
    const diff = differenceInDays(now, date);
    if(diff === 0) return 'Today';
    if(diff === 1) return 'Yesterday';
    if(diff < 8) return `${diff} days ago`;

    const sameYear = isSameYear(now, date);
    if(sameYear) return format(date, 'dd. m')
    return format(date, 'dd. MMMM yyyy');
}