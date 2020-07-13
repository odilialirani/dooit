class Api::Split::V1::ReceiptsController < ApplicationController
  def upload
    if params[:file]
      s3 = AWS::S3.new
      obj = s3.buckets['split-receipts'].objects.create('key', params[:file])

    else
      render json: []
    end

    # receipt = Receipt.create(
    #   s3_bucket: params[:s3_bucket],
    #   s3_path: params[:s3_path]
    # )

    # receipt.process_image
    render json: {}
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
