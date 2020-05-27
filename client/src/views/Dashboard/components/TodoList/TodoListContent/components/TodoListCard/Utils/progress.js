import moment from 'moment';

function convert( start, end ){
  return [
    moment(start, 'YYYY-MM-DD HH:mm:ss'),
    moment(end, 'YYYYMMDDHHmmss'),
    moment()
  ]
}

function calculate( end_diff, now_diff ){
  if( now_diff >= end_diff || end_diff == 0 ){
    return 100;
  }
  return ( now_diff / end_diff * 100 );
}

export default function calcProgress(type, start, end){
  const [ start_dttm, end_dttm, now_dttm ] = convert( start, end );
  
  const end_diff = end_dttm.diff( start_dttm, type||'days' );
  const now_diff = now_dttm.diff( start_dttm, type||'days' );

  return calculate( end_diff, now_diff );
}

export function daysProgress(start, end){
  const type = 'days';
  const [ start_dttm, end_dttm, now_dttm ] = convert( start, end );
  
  const end_diff = end_dttm.diff( start_dttm, type );
  const now_diff = now_dttm.diff( start_dttm, type );

  return calculate( end_diff, now_diff );
}

export function minutesProgress(start, end){
  const type = 'minutes';
  const [ start_dttm, end_dttm, now_dttm ] = convert( start, end );
  
  const end_diff = end_dttm.diff( start_dttm, type );
  const now_diff = now_dttm.diff( start_dttm, type );  

  return calculate( end_diff, now_diff );
}

export function secondsProgress(start, end){
  const type = 'seconds';
  const [ start_dttm, end_dttm, now_dttm ] = convert( start, end );
  
  const end_diff = end_dttm.diff( start_dttm, type );
  const now_diff = now_dttm.diff( start_dttm, type );  

  return calculate( end_diff, now_diff );
}