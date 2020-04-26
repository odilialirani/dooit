class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create(user_params)
    if recipe
      render json: user
    else
      render json: user.errors
    end
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
