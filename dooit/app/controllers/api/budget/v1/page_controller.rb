class Api::Budget::V1::PageController < ApplicationController

  def homepage
    if current_user
      render json: current_user.get_homepage_hash
    else
      render json: {}
    end
  end

end