require 'json'

class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    @user = User.create(
      username: user_params[:username], 
      password: user_params[:password], 
      first_name: user_params[:first_name],
      last_name: user_params[:last_name]
    )
    session[:user_id] = @user.id
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
