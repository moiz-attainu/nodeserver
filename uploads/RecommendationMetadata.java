
/****************************************************************************************************
 	Revision History
 **************************************************************************************************
 Date        	Author      Version     BugID   BookMark        Description
03-June-2019 	SahilB 	     5.2.R19 	NEWUX-19501   Recommended Cube Design using smart tools	 						
 */
package com.kyvos.commons.recommendation;

import com.kyvos.commons.entity.BuildDetail;
import com.kyvos.commons.entity.CubeLayoutDetails;
import com.kyvos.commons.recommendation.beans.data.QueryAnalysisData;
import com.kyvos.commons.utils.Utility;
import com.kyvos.commons.utils.XMLUtility;
import org.json.simple.JSONObject;
import org.w3c.dom.Node;

import java.util.Objects;

/**
 * The Class RecommendationMetaData.
 */
public class RecommendationMetaData
{

	/** The cube layout details. */
	private final CubeLayoutDetails cubeLayoutDetails;

	/** The last cube build details. */
	private final BuildDetail lastBuildDetail;


	private final QueryAnalysisData queryAnalysisData;

	/** The reposit date. */
	private final String repositDate = "";

	/** The view type. */
	private final String viewType;

	private final boolean isValidCube;

	/**
	 * Instantiates a new recommended entity details.
	 */
	public RecommendationMetaData(Node inputNode)
	{
		this.queryAnalysisData =null;
		this.lastBuildDetail =null;
		String repositeDate = XMLUtility.getAttibuteValue("REPOSITDATE", inputNode, "");
		if (!Utility.isNullOrBlank(repositeDate))
		{
		//	this.setRepositDate(repositeDate);
		}
		String viewType = XMLUtility.getAttibuteValue("VIEW_TYPE", inputNode, "");
		if (!Utility.isNullOrBlank(viewType))
		{
			//this.setViewType(viewType);
		}

		String validateFlag = XMLUtility.getAttibuteValue("VALIDATE", inputNode, "");
		if (!Utility.isNullOrBlank(validateFlag) && Boolean.parseBoolean(validateFlag))
		{
			//this.setValidCube(true);
		}

		this.cubeLayoutDetails = new CubeLayoutDetails(inputNode);
		//this.lastBuildDetail = new BuildDetail(inputNode);

		Node queryAnalysisNode = XMLUtility.getChildNode(inputNode, "QUERY_ANALYSIS_INFO");
		if (null != queryAnalysisNode)
		{
			//this.queryAnalysisData = new QueryAnalysisData();
			this.queryAnalysisData.parseXML(queryAnalysisNode);
		}
	}

	public RecommendationMetaData(CubeLayoutDetails cubeLayoutDetails, BuildDetail lastBuildDetail,
								  QueryAnalysisData queryAnalysisData, String repositDate, String viewType, boolean isValidCube)
	{
		this.cubeLayoutDetails = cubeLayoutDetails;
		this.lastBuildDetail = lastBuildDetail;
		this.queryAnalysisData = queryAnalysisData;
		this.repositDate = repositDate;
		this.viewType = viewType;
		this.isValidCube = isValidCube;
	}




	private void parseXML(Node inputNode)
	{


	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.kyvos.commons.entity.IXMLEntity#getXML()
	 */

	public String getXML()
	{
		StringBuilder sb = new StringBuilder();
		sb.append("<ENTITY_DETAILS");
		if (!Utility.isNullOrBlank(this.getRepositDate()))
		{
			sb.append(" REPOSITDATE=\"" + this.getRepositDate() + "\"");
		}
		if (!Utility.isNullOrBlank(this.getViewType()))
		{
			sb.append(" VIEW_TYPE=\"" + this.getViewType() + "\"");
		}
		if (this.isValidCube())
		{
			sb.append(" VALIDATE=\"" + this.isValidCube() + "\"");
		}
		sb.append(">\n");
		if(null!=cubeLayoutDetails)
		{
		sb.append(cubeLayoutDetails.getXML());
		}
		if(Objects.nonNull(this.lastBuildDetail))
		{
			sb.append(this.lastBuildDetail.getXML());
		}
		if (Objects.nonNull(queryAnalysisData)) {
			sb.append(queryAnalysisData.getXML());
		}
		sb.append("</ENTITY_DETAILS>");
		return sb.toString();
	}

	/**
	 * Gets the json.
	 *
	 * @return the json
	 */
	@SuppressWarnings("unchecked")
	public JSONObject getJson()
	{
		JSONObject jo = new JSONObject();
		JSONObject layout = new JSONObject();
		layout.put("VIEW_TYPE", this.getViewType());
		layout.put("REPOSITDATE", this.getRepositDate());
		layout.put("VALIDATE", this.isValidCube());
		if (Objects.nonNull(this.cubeLayoutDetails))
		{
			layout.put(this.cubeLayoutDetails.getJSONKey(), this.cubeLayoutDetails.getJson());
		}
		jo.put("LAYOUT_DETAILS", layout);
		jo.put(this.lastBuildDetail.getJSONKey(), this.lastBuildDetail.getJson());
		JSONObject queryInfo = new JSONObject();
		if (null != this.queryAnalysisData)
		{
			queryInfo = this.queryAnalysisData.getJSON();
		}
		jo.put("queryInfo", queryInfo);
		return jo;
	}

	/**
	 * Gets the cube layout details.
	 *
	 * @return the cube layout details
	 */
	public CubeLayoutDetails getCubeLayoutDetails()
	{
		return cubeLayoutDetails;
	}


	/**
	 * Gets the reposit date.
	 *
	 * @return the reposit date
	 */
	public String getRepositDate()
	{
		return repositDate;
	}


	/**
	 * Gets the view type.
	 *
	 * @return the view type
	 */
	public String getViewType()
	{
		return viewType;
	}


	public BuildDetail getLastBuildDetail()
	{
		return lastBuildDetail;
	}


	public boolean isValidCube()
	{
		return isValidCube;
	}

	public QueryAnalysisData getQueryAnalysisData() {
		return queryAnalysisData;
	}

}
