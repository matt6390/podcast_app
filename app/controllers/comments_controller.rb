class CommentsController < ApplicationController
  def index
    @comments = Comment.all 

    render 'index.json.jbuilder'
  end

  def commentable
    @comments = Comment.where("commentable_id = ? and commentable_type = ?", params[:id], "Podcast")
    render "index.json.jbuilder"
  end

  def show
    @comment = Comment.find(params[:id])

    render 'show.json.jbuilder'
  end

  def create
    # before_action :authenticate_user
    if current_user
      @comment = Comment.new(
        body: params[:body],
        commentable_id: params[:commentable_id],
        commentable_type: params[:commentable_type],
        user_id: current_user.id
        )
      if @comment.save
        render 'show.json.jbuilder'
      else
        render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
      end
    else
      @comment = Comment.new(
        body: params[:body],
        commentable_id: params[:commentable_id],
        commentable_type: params[:commentable_type],
        user_id: 1
        )
      if @comment.save
        render 'show.json.jbuilder'
      else
        render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end

  def update
    
  end

  def destroy
    
  end
end
