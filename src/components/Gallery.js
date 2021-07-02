import React from 'react'
import GridList from '@material-ui/core/GridList'
import Container from '@material-ui/core/Container'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import { makeStyles } from '@material-ui/core/styles'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@material-ui/core'
import { useGlobalContext } from '../context'
import { Link as Scroll } from 'react-scroll'
import PropTypes from 'prop-types'
import defaultImage from '../assets/noimage.png'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '3rem auto',
  },

  notFound: {
    margin: '7.5rem auto',
    fontFamily: 'RocknRoll One, sans-serif',
  },

  icon: {
    color: 'white',
  },

  return: {
    marginTop: '3.5rem',
  },
}))

const Gallery = () => {
  const classes = useStyles()
  const { imagesData } = useGlobalContext()
  const [open, setOpen] = React.useState(false)
  const [currentImage, setCurrentImage] = React.useState(null)

  const handleOpen = (image) => {
    setOpen(true)
    setCurrentImage(image)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return imagesData.length === 0 ? (
    <Typography variant='h4' align='center' className={classes.notFound}>
      No image meets the criteria.
    </Typography>
  ) : (
    <Container className={classes.root}>
      <GridList cols={3} className={classes.gridList} spacing={5}>
        {imagesData.map((imageContent) => {
          const { id, image, tags, user } = imageContent
          return (
            <GridListTile key={id}>
              <img
                src={image || Gallery.defaultProps.image}
                alt={tags || Gallery.defaultProps.tags}
              />
              <GridListTileBar
                title={tags || Gallery.defaultProps.tags}
                subtitle={<span>by: {user || Gallery.defaultProps.user}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${
                      tags || Gallery.defaultProps.tags
                    }`}
                    className={classes.icon}
                    onClick={() =>
                      handleOpen(image || Gallery.defaultProps.image)
                    }
                  >
                    <ZoomInIcon color='white' />
                  </IconButton>
                }
              />
            </GridListTile>
          )
        })}
      </GridList>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent dividers>
          <img src={currentImage} alt='' style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button autofocus onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {imagesData.length > 6 && (
        <Scroll to='header' smooth={true}>
          <Grid container justify='center' className={classes.return}>
            <Grid item>
              <Button color='primary' variant='outlined'>
                <ArrowUpwardIcon />
                <Typography> Back to top</Typography>
              </Button>
            </Grid>
          </Grid>
        </Scroll>
      )}
    </Container>
  )
}

Gallery.propTypes = {
  image: PropTypes.object.isRequired,
  tags: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
}

Gallery.defaultProps = {
  image: defaultImage,
  tags: '-',
  user: '-',
}

export default Gallery
