class UsersController < ApplicationController
  def index
    @users = User.all 

    render "index.json.jbuilder"
  end

  def show
    @users = current_user

    render "show.json.jbuilder"
  end

  def create
    @user = User.new(
      f_n: params[:f_n],
      l_n: params[:l_n],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if @user.save
      render json: {message: 'User created successfully'}, status: :created
    else
      render json: {errors: @user.errors.full_messages}, status: :bad_request
    end
  end

  def update
    @user = current_user

    @user.f_n = params[:f_n] || @user.f_name
    @user.l_n = params[:l_n] || @user.l_name
    @user.email = params[:email] || @user.email

    @user.password = params[:password] || @user.password
    @user.password_confirmation = params[:password_confirmation] || @user.password_confirmation

    if @user.save
      render "show.json.jbuilder"
    else
      render jeson: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.delete
    render json: {message: "User deleted"}
  end
  private

  def user_params
    params.require(:user).permit(:f_n, :l_n, :email, :password, :password_confirmation)
  end
end
