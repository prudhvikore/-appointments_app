import './index.css'

const AppointmentItem = props => {
  const {eachAppointments, onStarred} = props
  const {id, title, date, isStarred} = eachAppointments

  const onStar = () => {
    onStarred(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="app-header">
        <p className="app">{title}</p>
        <button type="button" className="btn" onClick={onStar} testid="star">
          <img src={starImage} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date">{`Date: ${date}`}</p>
    </li>
  )
}

export default AppointmentItem
