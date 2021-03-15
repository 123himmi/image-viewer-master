import React from "react";
import Header from "../../common/header/Header";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Input,
  InputLabel
} from "@material-ui/core";
import "./Home.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import mediaData from '../../mock/mediaData';
import UpgradImage from '../../mock/UpgradImage.jpg';
import * as moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';



export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      profilePic: "",
      imagesData: [],
      filterImages: [],
      liked: false,
      commentText: [],
      username: "",
      comments: [],
      userCommentsforImage: [],
    };
  }
  componentDidMount() {
    const accessToken = sessionStorage.getItem("accessToken");
    this.setState({ username: "Upgrad_sde" })
    if (!accessToken) {
      window.location = "/";
      return;
    }
    fetch(
      `https://graph.instagram.com/me/media?fields=260141908900978,caption&access_token=${accessToken}`
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data.data) {
          const { profile_picture } = data.data;
          this.setState({
            profilePic: profile_picture
          });
        }
      });
    fetch(
      `https://graph.instagram.com/17918270545584986?fields=id,media_type,media_url,username,timestamp&access_token=${accessToken}`
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data) {
          const imagesData = data;
          this.setState({ imagesData: imagesData, filterImages: imagesData });
        }
      });
  }
  filterData = str => {
    const { imagesData } = this.state;
    if (imagesData) {
      const result = (mediaData.data).filter(imageData =>
        imageData.caption.text.includes(str)
      );
      this.setState({ filterImages: result });
    }
  };

  dateConvert = (imgdate) => {
    let createdTime = new Date(imgdate);
    createdTime.setUTCSeconds(35);
    let yyyy = createdTime.getFullYear();
    let mm = createdTime.getMonth() + 1;
    let dd = createdTime.getDate();

    let HH = createdTime.getHours();
    let MM = createdTime.getMinutes();
    let ss = createdTime.getSeconds();

    let time = dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MM + ":" + ss;
    return time;
  }

  onClickAddBtn = (imageId) => {
    var count = this.state.count
    var comment = {
      id: count,
      imageId: imageId,
      username: this.state.username,
      text: this.state.commentText.text,
    }
    count++;
    var comments = [...this.state.comments, comment];
    this.setState({
      count: count,
      comments: comments,
      commentText: "",
    })
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

  onLikeClicked = (id) => {
    if (this.state.isLiked) {
      this.setState({
        isLiked: false
      });
    } else {
      this.setState({
        isLiked: true
      });
    }
    //this.props.onLikedClicked(id)
  }

  liked = id => {
    const { filterImages } = this.state;
    const likedImage = (mediaData.data).filter(img => img.id === id);
    const updateFilterImages = (mediaData.data).map(img => {
      var returnValue = { ...img };
      if (img.id === likedImage.id) {
        returnValue["liked"] = true;
      }
      return returnValue;
    });
    console.log(updateFilterImages);
  };



  render() {
    const { profilePic, filterImages } = this.state;
    console.log("test", mediaData);
    return (
      <React.Fragment>
        <Header
          homepageHeader={true}
          url={UpgradImage}
          onFilter={this.filterData}
        />
        <div className="card-wrapper">
          {(mediaData.data).map(img => (
            <Card className="card" key={img.id}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe">
                    <img
                      src={UpgradImage}
                      alt="user"
                      className="profile-pic"
                    />
                  </Avatar>
                }
                title={img.username}
                subheader={this.dateConvert(img.timestamp)}
              />
              <CardContent>
                <div className="content">
                  <img
                    src={img.media_url}
                    alt="post-pic"
                    className="post-pic"
                  />
                  <hr />
                  <div className="caption">{(img.caption.text)}</div>
                  {img.tags
                    ? img.tags.map(tag => (
                      <span className="hashtags" key={tag}>
                        #{tag.tag}&nbsp;
                      </span>
                    ))
                    : null}

                  {img.liked_image ? (
                    <p className="likes">
                      <FavoriteIcon
                        color="error"
                        className="like-icon"
                        onClick={() => this.liked(img.id)}
                      />
                      <span className="like-number">
                        &nbsp;{img.likes.count} likes
                          </span>
                    </p>
                  ) : (
                    <p className="likes">
                      <FavoriteBorderIcon
                        className="like-icon"
                        onClick={() => this.liked(img.id)}
                      />
                      <span className="like-number">
                        &nbsp;{img.likes.count} likes
                          </span>
                    </p>
                  )}
                  <div className="comments-block">
                    {this.state.comments.map(comment => (
                      img.id === comment.imageId ?
                        <div className="comment-display" key={comment.id}>
                          {comment.username}:{comment.text}
                        </div> : null
                    ))}
                  </div>
                  <FormControl
                    fullWidth={true}
                    margin="normal"
                    className="comment-form"
                  >
                    <InputLabel htmlFor="addComment">Add a comment</InputLabel>
                    {/* <Input className="comment-input" /> */}
                    <Input
                      id="addComment"
                      type="text"
                      comment={this.state.addComment}
                      className="comment-input"
                      onChange={(event) => this.onCommentChangeHandler(event, img.id)} value={this.state.addComment}
                    />
                    <Button variant="contained" color="primary" onClick={() => this.onClickAddBtn(img.id)}>
                      ADD
                        </Button>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
          ))}

        </div>
      </React.Fragment>
    );
  }
}
