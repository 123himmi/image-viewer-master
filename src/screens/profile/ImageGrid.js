import React from "react";
import { GridList, GridListTile } from "@material-ui/core";
import UpgradImage from '../../mock/UpgradImage.jpg';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Redirect } from 'react-router-dom'


const customStyles = {
  content: {
    top: '60%',
    left: '32%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '60%',
    height: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 50,
    height: 50,
    marginLeft: 200,
  },
  fab: {
    margin: theme.spacing(1),
  },
  gridListMain: {
    transform: 'translateZ(0)',
    cursor: 'pointer'
  },
  hr: {
    width: 460,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32,
  }
})

function FavoriteBorderIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 
      2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 
      5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 
      5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
    </SvgIcon>
  );
}

function FavoriteIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
       3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </SvgIcon>
  );
}

const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  )
}

export default class ImageGrid extends React.Component {

  constructor() {
    super();
    this.state = {
      dataAPIEndPt1: [],
      profilePic: [],
      loggedIn: sessionStorage.getItem("access_token") == null ? false : true,
      username: "",
      followedBy: 0,
      follows: 0,
      posts: 0,
      fullName: "",
      userImages: [],
      modalIsOpen: false,
      reqFullName: "dispNone",
      changedFullName: "",
      imgModalIsOpen: false,
      clickedImg: [],
      clickedImgId: [],
      clickedImgProfilePic: [],
      clickedImgUserName: "",
      clickedImgCaption: "",
      clickedImgTags: [],
      clickedImgLikes: 0,
      favClick: false,
      commentText: [],
      comments: [],
      userCommentsforImage: [],
    }
  }

  openImgModalHandler = () => {
    this.setState({ imgModalIsOpen: true });
  }

  closeImgModalHandler = () => {
    this.setState({ imgModalIsOpen: false });
  }

  onImageClickHandler = (image) => {
    console.log("testtttttttt", image);
    this.setState({ clickedImgId: image.id });
    this.setState({ clickedImg: image.media_url });
    this.setState({ clickedImgProfilePic: UpgradImage });
    this.setState({ clickedImgUserName: image.username });
    this.setState({ clickedImgCaption: image.caption.text });
    this.setState({ clickedImgTags: image.tags });
    this.setState({ clickedImgLikes: image.likes.count });
    this.openImgModalHandler();
  }

  onCommentChangeHandler = (event, imageId) => {
    var comment = {
      id: imageId,
      text: event.target.value,
    }
    this.setState({
      commentText: comment,
    });
  }
  onClickAddBtn = (imageId) => {
    var count = this.state.count
    var comment = {
      id: count,
      imageId: imageId,
      username: this.state.clickedImgUserName,
      text: this.state.commentText.text,
    }
    count++;
    var comments = [...this.state.comments, comment];
    this.setState({
      count: count,
      comments: comments,
      commentText: "",
    })
  };

  render() {
    const { posts } = this.props;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <GridList cellHeight={500} cols={3}>
          {posts.map(post => (
            <GridListTile onClick={() => this.onImageClickHandler(post)} className="postedImages-grid-item" key={post.id} cols={1}>
              <img src={post.media_url} alt={post.caption.text} />
            </GridListTile>
          ))}
        </GridList>
        <Modal ariaHideApp={false} isOpen={this.state.imgModalIsOpen} contentLabel="imgPost"
          onRequestClose={this.closeImgModalHandler} style={CustomStyles}>
          <div className="flex-container">
            <div className="leftModal">
              <img src={this.state.clickedImg} className="clickedImg" alt={this.state.clickedImgCaption} />
            </div>
            <div className="rightModal">
              <div className="modalHeader">
                <span><img src={this.state.clickedImgProfilePic} className="userProfilePic" alt={this.state.clickedImgUserName} /></span>
                <span className="clickedImgUserName">{this.state.clickedImgUserName}</span>
              </div>
              <hr />
              <div className="modalBody">
                <h4 className="captionText">{(this.state.clickedImgCaption)}</h4>
                {this.state.clickedImgTags.map(tags => (
                  <span className="captionTag">{"#" + tags.tag + ""}</span>
                ))}
                <div className="comments-block">
                  {this.state.comments.map(comment => (
                    this.state.clickedImgId === comment.imageId ?
                      <div className="comment-display" key={comment.id}>
                        {comment.username}: {comment.text}
                      </div> : null
                  ))}
                </div>

              </div>
              <div className="likeSection">
                <span onClick={() => this.setState({ favClick: !this.state.favClick })}>
                  {this.state.favClick === true ? <div>
                    <span className="favIcon"><FavoriteIcon /></span>
                    <span className="like">{" " + (this.state.clickedImgLikes)} likes</span>
                  </div> :
                    <div><span><FavoriteBorderIcon /></span>
                      <span className="like">{" " + (this.state.clickedImgLikes)} likes</span></div>}
                </span>
              </div>
              <div className="commentAddSection" >
                <FormControl className="formControl">
                  <InputLabel htmlFor="addComment">Add a comment</InputLabel>
                  <Input
                    id="addComment"
                    type="text"
                    comment={this.state.addComment}
                    onChange={(event) => this.onCommentChangeHandler(event, this.state.clickedImgId)} value={this.state.addComment}
                  />
                </FormControl>
                <Button variant="contained" color="primary" className="AddBtn" onClick={() => this.onClickAddBtn(this.state.clickedImgId)}>
                  ADD
                            </Button>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
