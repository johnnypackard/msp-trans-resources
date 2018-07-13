import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'recompose/compose';

const mapStateToProps = (reduxState) => ({
    reduxState,
    user: reduxState.user,
})

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blue[300],
    },
});

class BusinessCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // displayFavorite: this.props.
        }
    }

    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar 
                                alt="Transfeminist" 
                                src="./Transfeminist.svg" 
                                className={classes.avatar}
                            />
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={(this.props.businesses.biz_name)}
                        subheader="Verified Business"
                    />
                    <CardMedia
                        className={classes.media}
                        image={(this.props.businesses.image_url)}
                        title={(this.props.businesses.biz_name)}
                    />
                    <CardContent>
                        <Typography component="p">
                            Something goes here...
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph variant="body2">
                                    Reviews:
                                </Typography>
                            </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

BusinessCard.propTypes = {
    classes: PropTypes.object.isRequired,
}
;

export default compose(
    withStyles(styles, { name: 'BusinessCard' }),
    connect(mapStateToProps, null)
)(BusinessCard);


