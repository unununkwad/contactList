// import Avatar from '@components/avatar'
import { Fragment } from 'react'
import { X } from 'react-feather'

export const ErrorToast = (props) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <X size={12} />
          <h6 className='toast-title'>Błąd!</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          {props.message}
        </span>
      </div>
    </Fragment>
  )
  //test