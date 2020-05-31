class Api::Split::V1::FriendsController < ApplicationController

  def create
    friend = Friend.create(
      first_name: params[:first_name],
      last_name: params[:last_name],
      phone_number: params[:phone_number],
      active: true
    )

    render json: friend
  end

  def index
    if current_user
      render json: current_user.friends
    else
      render json: {}
    end
  end
end
