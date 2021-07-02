import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '@material-ui/core/Container'
import { useGlobalContext } from '../context'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '25ch',
    },
  },

  searchField: {
    marginTop: '1rem',
  },

  amount: {
    marginTop: '1rem',
    width: '3.5rem',
  },
}))

const ImageSearch = () => {
  const { setSearchTerm, amount, setAmount } = useGlobalContext()
  const classes = useStyles()

  const amounts = [10, 15, 30, 60]

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  return (
    <Container>
      <form className={classes.root} noValidate autoComplete='off'>
        <div style={{ width: '100%' }}>
          <TextField
            autofocus={true}
            fullWidth
            id='imageSearch'
            label='Image Search'
            className={classes.searchField}
            onChange={handleSearchTerm}
            color='primary'
          />
        </div>
        <div>
          <TextField
            id='amount'
            select
            label='Amount'
            value={amount}
            onChange={handleAmount}
            className={classes.amount}
            color='primary'
          >
            {amounts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </form>
    </Container>
  )
}

export default ImageSearch
