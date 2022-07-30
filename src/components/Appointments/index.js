import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem/index'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isFiltered: false,
  }

  onStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onStarredList = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onAddAppointment = () => {
    const {title, date} = this.state

    const newAppointment = {
      id: v4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {title, date, appointmentsList, isFiltered} = this.state
    const filterClass = isFiltered ? 'starred' : 'unStarred'

    const filteredList = isFiltered
      ? appointmentsList.filter(each => each.isStarred === true)
      : appointmentsList

    return (
      <div className="bg-container">
        <div className="card">
          <div className="card-sub">
            <div className="sub-1">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="titleInput" className="label">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                className="title-input"
                id="titleInput"
                onChange={this.onChangeTitleInput}
                value={title}
              />
              <label htmlFor="dateInput" className="label">
                Date
              </label>
              <input
                type="date"
                className="title-input"
                id="dateInput"
                onChange={this.onChangeDateInput}
                value={date}
              />
              <button
                type="button"
                className="button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="line" />
          <div className="appointments-header">
            <h1 className="header">Appointments</h1>
            <button
              type="button"
              className={filterClass}
              onClick={this.onStarredList}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredList.map(each => (
              <AppointmentItem
                eachAppointments={each}
                key={each.id}
                onStarred={this.onStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
