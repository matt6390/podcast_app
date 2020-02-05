class AdminsController < ApplicationController
  def index
      @admins = Admin.all 

      render "index.json.jbuilder"
  end

  def current
    # used on podcastCreate so that normal users cant do it
    if current_admin
      @admin = current_admin
      render "show.json.jbuilder"
    else
      render json: {errors: ["Not an admin"]}, status: :unauthorized
    end 
  end

  def create
    # secret key to verify only authorized can create account
    if params[:id] == Rails.application.credentials.admin_create_key
      @admin = Admin.new(
        name: params[:name],
        email: params[:email],
        password: params[:password],
        password_confirmation: params[:password_confirmation]
      )
      if @admin.save
        render json: {message: 'Admin created successfully'}, status: :created
      else
        render json: {errors: @admin.errors.full_messages}, status: :bad_request
      end
      # if not authorized
    else
      render json: {errors: ["Not Authorized"]}, status: :unauthorized
    end
    # end of function
  end

  def update
    @admin = current_admin

    @admin.name = params[:name] || @admin.name
    @admin.email = params[:email] || @admin.email
    @admin.password = params[:password] || @admin.password
    @admin.password_confirmation = params[:password_confirmation] || @admin.password_confirmation

    if @admin.save
      render "show.json.jbuilder"
    else
      render jeson: {errors: @admin.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @admin = Admin.find(params[:id])
    @admin.delete
    render json: {message: "Admin Deleted from record"}
  end
end
