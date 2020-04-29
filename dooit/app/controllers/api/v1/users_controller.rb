class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    puts params
    @user = User.create(username: params[:username], password: params[:password])
    # session[:user_id] = @user.id
    redirect_to '/users'
  end

  def show
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def destroy
    user&.destroy
    render json: { message: 'User deleted!' }
  end

  private

  def user_params
    params.permit(:username, :password, :first_name, :last_name)
  end

  def user
    @user ||= User.find(params[:id])
  end
end
