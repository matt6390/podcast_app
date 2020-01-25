class PodcastsController < ApplicationController
  def index
    @podcasts = Podcast.all

    if @podcasts
      render "index.json.jbuilder"
    else 
      render json: {errors: @podcasts.errors.full_messages}, status: :bad_request
    end
  end

  def show
    @podcast = Podcast.find(params[:id])

    if @podcast
      render "show.json.jbuilder"
    else 
      render json: {errors: @podcast.errors.full_messages}, status: :bad_request
    end
  end

  def create
    # binding.pry
    @podcast = Podcast.new(
      name: params[:name],
      url: params[:url]
      )

    if @podcast.save
      render json: {message: 'Podcast created successfully'}, status: :created
    else
      render json: {errors: @podcast.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    @podcast = Podcast.find(params[:id])
    @podcast.delete
    render json: {message: "Podcast deleted"}
  end
end
