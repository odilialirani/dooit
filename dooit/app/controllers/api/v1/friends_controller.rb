class Api::V1::FriendsController < ApplicationController
  def index
    friends = Friend.all
    render json: friends
  end

  def create
    friend = Friend.create(friend_params)
    if friend
      render json: friend
    else
      render json: friend.errors
    end
  end

  def show
    if friend
      render json: friend
    else
      render json: friend.errors
    end
  end

  def destroy
    friend&.destroy
    render json: { message: 'Friend deleted!' }
  end

  private

  def friend_params
    params.permit(:first_name, :last_name, :phone_number, :active)
  end

  def friend
    @friend ||= Friend.find(params[:id])
  end
end
