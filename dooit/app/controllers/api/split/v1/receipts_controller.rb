class Api::Split::V1::ReceiptsController < ApplicationController
  def upload
    receipt = Receipt.create(
      s3_bucket: params[:s3_bucket],
      s3_path: params[:s3_path]
    )

    # TODO: process through tesseract
    receipt.process_image

    render json: receipt
  end

  def index
    if current_user
      render json: current_user.receipts
    else
      render json: {}
    end
  end

  private

  def receipts_params

  end

end
