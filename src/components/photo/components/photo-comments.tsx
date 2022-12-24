import React, { useEffect, useState } from 'react';
import { UserContext } from "../../../context/userProvider";
// @ts-ignore
import { PaperPlaneTilt } from "phosphor-react";
import { UseFetch } from "../../../hooks/useFetch";
import { COMMENT_POST } from "../../../@api/api";
import { ErrorMessage } from "../../../global.styles";
import { CommentAuthor, CommentContainer, CommentContent, CommentItem } from "../photo-content.styles";
import { PhotoCommentsForm } from "./photo-comments-form";
// @ts-ignore
export const PhotoComments: React.FC<any> = ({id, comments}) => {
  
  const [comment, setComment] = useState<any>('')
  const [newComment, setNewComment] = useState<any>(() => comments)
  
  // @ts-ignore
  const {login} = React.useContext(UserContext)
  const {request, error} = UseFetch()
  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    
    const token = window.localStorage.getItem('token')
    const {url, options} = COMMENT_POST(id, {comment}, token)
    
    const {response, json} = await request(url, options)
    
    if (response.ok) {
      
      setComment('')
      setNewComment((comments: any) => [...comments, json])
      
    }
  };
  
  useEffect(() => {
  
  }, [comments, request])
  
  return (
    
    <>
      
      <CommentContainer>
        {newComment.map((comment: any) =>
          <CommentItem key={comment.comment_ID}>
            <CommentAuthor>{comment.comment_author}:</CommentAuthor>
            <CommentContent>{comment.comment_content}</CommentContent>
            {/*<CommentContent>{comment.comment_date}</CommentContent>*/}
          </CommentItem>
        )}
      </CommentContainer>
      
      {
        login &&
        <>
          <PhotoCommentsForm
            value={comment}
            onSubmit={handleSubmit}
            onChange={(event: { target: { value: any; }; }) => setComment(event.target.value)}
          />
          {error && <ErrorMessage/>}
        </>
      }
    
    </>
  
  );
};