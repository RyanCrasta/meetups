import classes from './MeetUpDetail.module.css'

function MeetUpDetail(props) {
    return (
      <section className={classes['detail']}>
        Meet page
        <img
          src={props.imgSource}
          alt={props.title}
        />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
      </section>
    );
  }
  
  export default MeetUpDetail;
  